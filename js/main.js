const mobileSidebar = document.getElementById('mobileSidebar');
const closeButton = document.getElementById('closeBtn');
const hamburgerBtn = document.getElementById('hamburgerBtn');

function convertKelvinToCelsius(kelvin) {
  return Math.round(kelvin - 273.15);
}

function showSideMenu() {
  mobileSidebar.classList.remove('hidden');

  mobileSidebar.classList.add('fixed');
}

function hideSideMenu() {
  mobileSidebar.classList.remove('fixed');

  mobileSidebar.classList.add('hidden');
}

function showMore() {
  document.getElementById('countryInfo').classList.toggle('hidden');
  document.getElementById('weatherInfo').classList.toggle('hidden');
}

function showWeather(country) {
  const apiKey = '1810d5f4b037b1f6ea4692c6b589d8ba';

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      const weatherInfo = document.getElementById('weatherInfo');

      weatherInfo.innerHTML = `
      <div class="space-y-4">
      <div>
        <span class="font-medium text-4xl">${country}</span>
      </div>
      <div class="text-3xl">
        <span class="relative"
          >${convertKelvinToCelsius(
            data.main.temp
          )}<span class="absolute text-xl -top-2 font-semibold"
            >o</span
          ></span
        >
        <span>C</span>
      </div>
      <div><span>${data.main.humidity}% Humidity</span></div>
      <div>
        <span
          >Feels like

          <span class="relative"
            >${convertKelvinToCelsius(
              data.main.feels_like
            )}<span class="absolute -top-2 font-semibold"
              >o</span
            ></span
          >
          <span class="ml-1">C</span>
        </span>
      </div>
    </div>
    <div class="flex items-center justify-end w-full">
    ${
      data.weather[0].main == 'Clouds'
        ? '<img src="./images/clouds.gif" alt="" class="w-20" />'
        : data.weather[0].main == 'Rain'
        ? '<img src="./images/rain.gif" alt="" class="w-20" />'
        : '<img src="./images/sun.gif" alt="" class="w-20" />'
    }
      
    </div>
      `;
    })
    .catch((error) => console.error('Error fetching weather data:', error));
}

function searchCountry() {
  const countryInput = document.getElementById('Search').value;
  fetch(`https://restcountries.com/v3.1/name/${countryInput}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const countryInfo = document.getElementById('countryInfo');
      const countryBasic = document.getElementById('countryBasic');
      const firstBlock = document.getElementById('firstBlock');

      let area = data[0].area;
      let capital = data[0].capital[0];

      //   let capLat =  data[0].;
      //   let capLng =  data[0].;

      let cca2 = data[0].cca2;
      let coatOfArms_svg = data[0].coatOfArms.svg;

      let continents = data[0].continents;
      let demonyms = data[0].demonyms.eng.f;
      let flags = data[0].flags.svg;
      // let independent = data[0].;
      let population = data[0].population;
      let timezones = data[0].timezones[0];
      let region = data[0].region;
      let subregion = data[0].subregion;

      let country_name = data[0].name.common;
      let country_name_official = data[0].name.official;

      countryBasic.innerHTML = `
        <h1 class="font-semibold my-4 text-4xl">${country_name}</h1>
        <span class="text-2xl">${country_name_official}</span>
              `;
      showWeather(data[0].name.common);

      countryInfo.innerHTML = `
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          class="sm:col-span-2 col-span-full px-4 py-2 rounded-lg bg-white shadow-lg space-y-2"
        >
          <span class="text-lg font-semibold">Country Flag</span>
          <div>
            <img src=${flags} alt="" />
          </div>
        </div>
        <div
          class="sm:col-span-1 col-span-full px-4 py-2 rounded-lg bg-white shadow-lg space-y-2"
        >
          <span class="text-lg font-semibold"
            >Country coat of Arms</span
          >
          <div class="flex justify-center items-center h-full">
            <img
              src=${coatOfArms_svg}
              alt=""
            />
          </div>
        </div>

        <div
          class="col-span-full bg-white flow-root rounded-lg border border-gray-100 py-3 shadow-lg"
        >
          <dl class="-my-3 divide-y divide-gray-100 text-sm">
            <div
              class="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
            >
              <dt class="font-medium text-gray-900">Capital</dt>
              <dd class="text-gray-700 sm:col-span-2">${capital}</dd>
            </div>

            <div
              class="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
            >
              <dt class="font-medium text-gray-900">Area</dt>
              <dd class="text-gray-700 sm:col-span-2">${area} sqft</dd>
            </div>

            <div
              class="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
            >
              <dt class="font-medium text-gray-900">CCA2 Code</dt>
              <dd class="text-gray-700 sm:col-span-2">${cca2}</dd>
            </div>

            <div
              class="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
            >
              <dt class="font-medium text-gray-900">Continents</dt>
              <dd class="text-gray-700 sm:col-span-2">${continents}</dd>
            </div>

            <div
              class="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
            >
              <dt class="font-medium text-gray-900">Region</dt>
              <dd class="text-gray-700 sm:col-span-2">${region}</dd>
            </div>

            <div
              class="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
            >
              <dt class="font-medium text-gray-900">Sub-Region</dt>
              <dd class="text-gray-700 sm:col-span-2">${subregion}</dd>
            </div>

            <div
              class="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
            >
              <dt class="font-medium text-gray-900">Population</dt>
              <dd class="text-gray-700 sm:col-span-2">${population}</dd>
            </div>

            <div
              class="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
            >
              <dt class="font-medium text-gray-900">Time Zone</dt>
              <dd class="text-gray-700 sm:col-span-2">${timezones}</dd>
            </div>

            
          </dl>
        </div>
      </div>

              `;
      firstBlock.classList.remove('hidden');
    })
    .catch((error) => console.error('Error fetching country data:', error));
}
