import React from "react";
import AppFunctional from "./AppFunctional";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

let up, down, left, right, reset, submit;
let squares, coordinates, steps, message, email;

const updateStatelessSelectors = (document) => {
  up = document.querySelector("#up");
  down = document.querySelector("#down");
  left = document.querySelector("#left");
  right = document.querySelector("#right");
  reset = document.querySelector("#reset");
  submit = document.querySelector("#submit");
};

const updateStatefulSelectors = (document) => {
  squares = document.querySelectorAll(".square");
  coordinates = document.querySelector("#coordinates");
  steps = document.querySelector("#steps");
  message = document.querySelector("#message");
  email = document.querySelector("#email");
};

describe("AppFunctional", () => {

  beforeEach(() => {
    render(<AppFunctional />)
  })

  describe('Buttons', () =>{
    test('Left button is displayed', () => {
      screen.getByText('LEFT')
    })

    test('Right button is displayed', () => {
      screen.getByText('RIGHT')
    })

    test('Up button is displayed', () => {
      screen.getByText('UP')
    })

    test('Down button is displayed', () => {
      screen.getByText('DOWN')
    })

    test('Reset button is displayed', () => {
      screen.getByText('reset')
    })
  })

  describe('Email Input', () => {    

    beforeEach(() => {
      updateStatelessSelectors(document)
      updateStatefulSelectors(document)
    })

    test('Updates value at every keystroke', () => {
      fireEvent.change(email, { target: { value: 'l' } })
      expect(email).toHaveValue('l')
      fireEvent.change(email, { target: { value: 'la' } })
      expect(email).toHaveValue('la')
      fireEvent.change(email, { target: { value: 'lad' } })
      expect(email).toHaveValue('lad')
      fireEvent.change(email, { target: { value: 'lady' } })
      expect(email).toHaveValue('lady')
    })
  })
});
