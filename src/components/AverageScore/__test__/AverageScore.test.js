import AverageCalculation from '../AverageCalculation';

import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";


it('Should render the AverageCalculation component', () => {
    render(<AverageCalculation />);
    const avCalcComponent = screen.getByText('Average Calculation');

    expect(avCalcComponent).toBeVisible();
  });




