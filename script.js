const urlApi = 'https://api.covidtracking.com/v1/us/current.json';
//variables for api data
let covidDeath = document.querySelector('[death]');
let lastDate = document.querySelector('[lastDate]');
let hospitalized = document.querySelector('[hospitalized]');
let hospitalizedCurrently = document.querySelector('[hospitalizedCurrently]');
let withVentilator = document.querySelector('[withVentilator]');
let negative = document.querySelector('[negative]');
let positive = document.querySelector('[positive]');
let totalTestResults = document.querySelector('[totalTestResults]')
let covid;

getData(urlApi).then(data => { 
  covid = data;
  displayData(covid);
});

const statesOfNorthAmerica = [
  {name :'Alabama', value:"al"},
  {name :'Alaska', value:"ak"},
  {name :'American Samoa', value:"as"},
  {name :'Arizona', value:"az"},
  {name :'Arkansas', value:"ar"},
  {name :'California', value:"ca"},
  {name :'Colorado', value:"co"},
  {name :'Connecticut', value:"ct"},
  {name :'Delaware', value:"de"},
  {name :'District of Columbia', value:"dc"},
  {name :'Florida', value:"fl"},
  {name :'Georgia', value:"ga"},
  {name :'Guam', value:"gu"},
  {name :'Hawaii', value:"hi"},
  {name :'Idaho', value:"id"},
  {name :'Illinois', value:"il"},
  {name :'Indiana', value:"in"},
  {name :'Iowa', value:"ia"},
  {name :'Kansas', value:"ks"},
  {name :'Kentucky', value:"ky"},
  {name :'Louisiana', value:"la"},
  {name :'Maine', value:"me"},
  {name :'Maryland', value:"md"},
  {name :'Massachusetts', value:"ma"},
  {name :'Michigan', value:"mi"},
  {name :'Minnesota', value:"mn"},
  {name :'Mississippi', value:"ms"},
  {name :'Missouri', value:"mo"},
  {name :'Montana', value:"mt"},
  {name :'Nebraska', value:"ne"},
  {name :'Nevada', value:"nv"},
  {name :'New Hampshire', value:"nh"},
  {name :'New Jersey', value:"nj"},
  {name :'New Mexico', value:"nm"},
  {name :'New York', value:"ny"},
  {name :'North Carolina', value:"nc"},
  {name :'North Dakota', value:"nd"},
  {name :'Northern Mariana Islands', value:"mp"},
  {name :'Ohio', value:"oh"},
  {name :'Oklahoma', value:"ok"},
  {name :'Oregon', value:"or"},
  {name :'Pennsylvania', value:"pa"},
  {name :'Puerto Rico', value:"pr"},
  {name :'Rhode Island', value:"ri"},
  {name :'South Carolina', value:"sc"},
  {name :'South Dakota', value:"sd"},
  {name :'Tennessee', value:"tn"},
  {name :'Texas', value:"tx"},
  {name :'US Virgin Islands', value:"vi"},
  {name :'Utah', value:"ut"},
  {name :'Vermont', value:"vt"},
  {name :'Virginia', value:"va"},
  {name :'Washington', value:"wa"},
  {name :'West Virginia', value:"wv"},
  {name :'Wisconsin', value:"wi"},
  {name :'Wyoming', value:"wy"}
]
let combo = document.querySelector('#states');
statesOfNorthAmerica.map(state =>{
  let element = document.createElement('option');
  element.value = state.value;
  element.textContent = state.name;
  combo.appendChild(element);
})

combo.addEventListener('click', function(){
  if(combo.value !== 'US'){
    let param = combo.value;
    const urlStates = `https://api.covidtracking.com/v1/states/${param}/daily.json`;
    getData(urlStates).then(data => {
     let states = data;
     displayData(states);
    }); 
  }else{
    getData(urlApi).then(data => {
      covid = data;
      displayData(covid);
    });
  }
});

function displayData(covid) {
  (covid.death === null) ? covidDeath.innerText = 0 : covidDeath.innerText = covid.death;
  lastDate.innerText = `Last update ${displayDate(new Date(covid.dateChecked))}`;
  (covid.hospitalized === null) ? hospitalized.innerText = 0 : hospitalized.innerText = covid.hospitalized;
  (covid.hospitalizedCurrently === null) ? hospitalizedCurrently.innerText = 0 : hospitalizedCurrently.innerText = covid.hospitalizedCurrently;
  (covid.onVentilatorCurrently === null) ? withVentilator.innerText = 0 : withVentilator.innerText = covid.onVentilatorCurrently;
  (covid.negative === null) ? negative.innerText = 0 : negative.innerText = covid.negative;
  (covid.positive === null) ? positive.innerText = 0 : positive.innerText = covid.positive;
  (covid.totalTestResults === null) ? totalTestResults.innerText = 0 : totalTestResults.innerText = covid.totalTestResults;
}

function displayDate(date){
  return date.toLocaleDateString(
    undefined,
    {day: 'numeric', month: 'long', year: 'numeric'}
  )
}

//animation scroll
const scrollElements = document.querySelectorAll(".elements");
window.addEventListener("scroll", () => { 
  alterTimer(handleScrollAnimation(), 200);
});
const handleScrollAnimation = () => {
  scrollElements.forEach((element) => {
    if (elementInView(element, 1)) {
      displayScrollElement(element);
    } else if (elementOutofView(element)) {
      hideScrollElement(element)
    }
  })
}
const elementInView = (element, offset = 0) => {
  let elementTop = element.getBoundingClientRect().top;
  return ( elementTop <= (window.innerHeight || document.documentElement.clientHeight) / offset);
};

const elementOutofView = (element) => {
  let elementTop = element.getBoundingClientRect().top;
  return ( elementTop > (window.innerHeight || document.documentElement.clientHeight));
};

const displayScrollElement = (element) => {
  element.classList.add("scrolled");
};

const hideScrollElement = (element) => {
  element.classList.remove("scrolled");
};
let timer = false;
const alterTimer = (funct, time)=>{
  if(timer) return;
  timer = true;

  setTimeout(() => {
    funct();
    timer = false;
}, time);
}

function getData(url){
  return fetch(url)
  .then(response =>{
    return response.json()
    .then(element =>{
      let items = {
        death : element[0].death,
        dateChecked : element[0].dateChecked,
        hospitalized : element[0].hospitalized,
        hospitalizedCurrently : element[0].hospitalizedCurrently,
        onVentilatorCurrently : element[0].onVentilatorCurrently,
        negative : element[0].negative,
        positive : element[0].positive,
        totalTestResults : element[0].totalTestResults
      }
      return items;
    })
  })
}
