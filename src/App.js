import './App.css';
import AverageScore from './components/AverageScore/AverageScore';
import Header from './components/Header/Header';
import Instructions from './components/Instructions/Instructions';
import InputField from './components/InputField/InputField';
import RadarChartComponent from './components/RadarChart/RadarChart';

import { useState, useEffect, useRef } from 'react';


function App() {


  const [cityQuery, setCityQuery] = useState('');
  const [cityCategoryData, setCityCategoryData] = useState([
    {name: 'Cost of Living', score: 0},
    {name: 'Commute', score: 0},
    {name: 'Safety', score: 0},
    {name: 'Leisure & Culture', score: 0},
    {name: 'Tolerance', score: 0},
    {name: 'Outdoors', score: 0}
  ]);
  const [avScore, setAvScore] = useState(0);
  const [totalCities, setTotalCities] = useState();
  const [cityNames, setCityNames] = useState([]);


  useEffect(() => { fetchCityData()}, [cityQuery]);
  useEffect(() => {fetchCityList()}, [cityQuery]);


  // Cleans input from field and sets text as cityQuery to be used in URL
    const handleInputFieldText = (text) => {
    setCityQuery(text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-'));
  }


  // api calls: 1. list of all available cities with score data
  //            2. corresponding city score data
  const citiesListUrl = 'https://api.teleport.org/api/urban_areas/';
  const cityScoreUrl = `https://api.teleport.org/api/urban_areas/slug:${cityQuery}/scores/`;


  //  Returns city score data and sets state with helper functions
  const fetchCityData = async () => {
    try {
      const response = await fetch(cityScoreUrl);
      const data = await response.json();
      parsedCityCategoryData(data);
      parsedAvScoreData(data);
    }
    catch(error) {
      console.log('error', error);
    }
  }


  //  Returns a list of all available cities and sets state
  const fetchCityList = async () => {
    try {
      const response = await fetch(citiesListUrl);
      const data = await response.json();

      const namesAndHrefs = data["_links"]["ua:item"];
      const names = namesAndHrefs.map(
        nameAndHref => nameAndHref.name
      );

      setTotalCities(data.count);
      setCityNames(names)
    }
    catch(error) {
      console.log('error', error);
    }
  }


  // parses category data for radar chart component
  const parsedCityCategoryData = (data) => {
    const { categories } = data;
    let removedCategories = [
      'Housing',
      'Venture Capital',
      'Travel Connectivity',
      'Business Freedom',
      'Startups',
      'Healthcare',
      'Education',
      'Environmental Quality',
      'Economy',
      'Taxation',
      'Internet Access'
    ];

    const cleanData = categories.map(category => {
      return {
        name: category.name,
        score: parseFloat(category.score_out_of_10.toFixed(1))
      }
    }).filter(category => !removedCategories.includes(category.name));

    setCityCategoryData(cleanData);
  }


  // parses average score for average score component
  const parsedAvScoreData = (data) => {
    const { teleport_city_score } = data;
    const score = parseFloat(teleport_city_score.toFixed(1));
    setAvScore(score);
  }


  // scroll to data container from hero image
  const scrollToRef = (ref) => ref.current.scrollIntoView({behavior: 'smooth'});
  const myRef = useRef(null);
  const executeScroll = () => scrollToRef(myRef);


  return (
    <div className="container">

      <Header executeScroll={executeScroll}/>
      <Instructions totalCities={totalCities} />
      <InputField  onSubmit={handleInputFieldText} cityNames={cityNames}/>
      <div className="data-container" ref={myRef}>
        <RadarChartComponent categoryData={cityCategoryData} cityName={cityQuery}/>
        <AverageScore avScore={avScore}/>
      </div>
    </div>
  );
}

export default App;
