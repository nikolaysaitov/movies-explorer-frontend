import { useState } from "react";

export function useCountCard(CARD_COUNT, CARD_BRAKEPOINT) {
  const [countAddFilms, setCountAddFilms] = useState(0);
  const [startCountFilms, setStartCountFilms] = useState(0);

  function setParamsCountFilms(mode) {
    const deviceWidth = document.documentElement.clientWidth;
    const isUpdate = mode === "all";

    const middleDevice =
      deviceWidth <= CARD_BRAKEPOINT.TWO && deviceWidth > CARD_BRAKEPOINT.ONE;
    const smallDevice =
      deviceWidth <= CARD_BRAKEPOINT.ONE && deviceWidth >= 320;

    if (middleDevice) {
      setCountAddFilms(CARD_COUNT.MIDDLE_DEVICE.ADD);
      isUpdate && setStartCountFilms(CARD_COUNT.MIDDLE_DEVICE.START);
    } else if (smallDevice) {
      setCountAddFilms(CARD_COUNT.SMALL_DEVICE.ADD);
      isUpdate && setStartCountFilms(CARD_COUNT.SMALL_DEVICE.START);
    } else {
      setCountAddFilms(CARD_COUNT.BIG_DEVICE.ADD);
      isUpdate && setStartCountFilms(CARD_COUNT.BIG_DEVICE.START);
    }
  }

  return { countAddFilms, startCountFilms, setParamsCountFilms };
}
