import Header from "../Header";

import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";



it('should render the Header component', () => {
    render(<Header />);
    const headerComponent = screen.getByRole('heading');

    expect(headerComponent).toBeVisible();
  });