import RadarChart from '../RadarChart';
import App from '../../../App';

import { render, screen, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";

// *******This import overides the API call *********
//import { server, rest } from '../../../testServer'

it('Should render the RadarChart component', () => {
    render(<RadarChart />);
    const radarChartComponent = screen.getByText(/Radar Chart/i);
    expect(radarChartComponent).toBeVisible();
});


// Renders REAL API DATA
it('should render API data', async () => {
    render(<App /> );
    const asyncData = await screen.findByTestId('radarData');
    const inputField = screen.getByPlaceholderText(/e.g. Manchester/i);
    const buttonElement = screen.getByRole('button', {name: /Find/i});
    const input = "manchester";
    fireEvent.change(inputField, {
      value: input
    })
    fireEvent.click(buttonElement);
    expect(asyncData).toBeInTheDocument();
    // expect(asyncData.textContent).toContain('Venture Capital');
  })


  //Renders MOCK API DATA
//   it('should render data from MOCK', async () => {
//     render(<RadarChart/> );
//     const asyncData = await screen.findByText(/housing/i)
//     const asyncData = await screen.findByTestId('radarData')
//     expect(asyncData).toBeVisible();
//     expect(asyncData.textContent).toContain('i should fail')
//     expect(asyncData.textContent).toContain('Housing')

//   })
