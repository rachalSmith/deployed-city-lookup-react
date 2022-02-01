import InputField from '../InputField';

import { fireEvent, render, screen } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";

const mockFunc = jest.fn()

describe('InputField Component', () => {
  it('should render an input field', () => {
    render(<InputField onChange={mockFunc}/>);
    const inputField = screen.getByLabelText('Search');
    expect(inputField).toHaveAttribute('name', 'input-field');
  })
})

describe('text inside the input field', () => {
  it('should display the text inside the input field', () => {
    render(<InputField onChange={mockFunc}/>);
    const inputField = screen.getByPlaceholderText(/e.g. Manchester/i);
    const input = "manchester";
    fireEvent.change(inputField, {
      value: input
    })
    expect(inputField.value).toBeVisible;
  })

  it('should clear text from the input field after find button is pressed', () => {
    render(<InputField onChange={mockFunc}/>);
    const inputField = screen.getByPlaceholderText(/e.g. Manchester/i);
    const buttonElement = screen.getByRole('button', {name: /Find/i});
    const input = "manchester";

    fireEvent.change(inputField, {
      value: input
    })
    fireEvent.click(buttonElement);

    expect(inputField.value).toBe('');
  })
})