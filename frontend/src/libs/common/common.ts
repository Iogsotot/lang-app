export const animateBorderColor = (selector: string, colorHsl: string): void => {
  document
    .querySelector(selector)
    ?.animate(
      [
        { border: `1px solid hsla(${colorHsl}, 0.1)` },
        { border: `1px solid hsla(${colorHsl}, 0.5)` },
        { border: `1px solid hsla(${colorHsl})` },
        { border: `1px solid hsla(${colorHsl}, 0.5)` },
        { border: `1px solid hsla(${colorHsl}, 0.1)` },
      ],
      {
        duration: 400,
        iterations: 1,
      },
    );
};

export const modificator1248 = (modificator: number): number => 2 ** (modificator - 1);
