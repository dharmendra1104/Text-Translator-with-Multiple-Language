const countries = {
  "hi-IN": "Hindi",
  "am-ET": "Amharic",
  "ar-SA": "Arabic",
  "be-BY": "Bielarus",
  "bem-ZM": "Bemba",
  "bi-VU": "Bislama",
  "bjs-BB": "Bajan",
  "bn-IN": "Bengali",
  "bo-CN": "Tibetan",
  "br-FR": "Breton",
  "bs-BA": "Bosnian",
  "ca-ES": "Catalan",
  "cop-EG": "Coptic",
  "cs-CZ": "Czech",
  "cy-GB": "Welsh",
  "da-DK": "Danish",
  "dz-BT": "Dzongkha",
  "de-DE": "German",
  "dv-MV": "Maldivian",
  "el-GR": "Greek",
  "en-GB": "English",
  "es-ES": "Spanish",
  "et-EE": "Estonian",
  "eu-ES": "Basque",
  "fa-IR": "Persian",
  "fi-FI": "Finnish",
  "fn-FNG": "Fanagalo",
  "fo-FO": "Faroese",
  "fr-FR": "French",
  "gl-ES": "Galician",
  "gu-IN": "Gujarati",
  "ha-NE": "Hausa",
  "he-IL": "Hebrew",
  "hr-HR": "Croatian",
  "hu-HU": "Hungarian",
  "id-ID": "Indonesian",
  "is-IS": "Icelandic",
  "it-IT": "Italian",
  "ja-JP": "Japanese",
  "kk-KZ": "Kazakh",
  "km-KM": "Khmer",
  "kn-IN": "Kannada",
  "ko-KR": "Korean",
  "ku-TR": "Kurdish",
  "ky-KG": "Kyrgyz",
  "la-VA": "Latin",
  "lo-LA": "Lao",
  "lv-LV": "Latvian",
  "men-SL": "Mende",
  "mg-MG": "Malagasy",
  "mi-NZ": "Maori",
  "ms-MY": "Malay",
  "mt-MT": "Maltese",
  "my-MM": "Burmese",
  "ne-NP": "Nepali",
  "niu-NU": "Niuean",
  "nl-NL": "Dutch",
  "no-NO": "Norwegian",
  "ny-MW": "Nyanja",
  "ur-PK": "Pakistani",
  "pau-PW": "Palauan",
  "pa-IN": "Panjabi",
  "ps-PK": "Pashto",
  "pis-SB": "Pijin",
  "pl-PL": "Polish",
  "pt-PT": "Portuguese",
  "rn-BI": "Kirundi",
  "ro-RO": "Romanian",
  "ru-RU": "Russian",
  "sg-CF": "Sango",
  "si-LK": "Sinhala",
  "sk-SK": "Slovak",
  "sm-WS": "Samoan",
  "sn-ZW": "Shona",
  "so-SO": "Somali",
  "sq-AL": "Albanian",
  "sr-RS": "Serbian",
  "sv-SE": "Swedish",
  "sw-SZ": "Swahili",
  "ta-LK": "Tamil",
  "te-IN": "Telugu",
  "tet-TL": "Tetum",
  "tg-TJ": "Tajik",
  "th-TH": "Thai",
  "ti-TI": "Tigrinya",
  "tk-TM": "Turkmen",
  "tl-PH": "Tagalog",
  "tn-BW": "Tswana",
  "to-TO": "Tongan",
  "tr-TR": "Turkish",
  "uk-UA": "Ukrainian",
  "uz-UZ": "Uzbek",
  "vi-VN": "Vietnamese",
  "wo-SN": "Wolof",
  "xh-ZA": "Xhosa",
  "yi-YD": "Yiddish",
  "zu-ZA": "Zulu"
}

const selectTag = document.querySelectorAll("select");
const translateBtn = document.querySelector(".btn");
const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
const exchange = document.querySelector(".exchange");
const icons = document.querySelectorAll(".icons i");


selectTag.forEach(selectTag => {
  for (let countryCode in countries) {
    let option = document.createElement("option");
    // let option =`<option value="${countryCode}">${countries[countryCode]}</option>`
    option.value = countryCode;
    option.textContent = countries[countryCode];
    selectTag.appendChild(option);
  }
});

if (selectTag[1].value === "hi-IN") {
  selectTag[0].value = "en-GB";
}

exchange.addEventListener('click', () => {
  let tempText = fromText.value            //exchange textarea
  fromText.value = toText.value
  toText.value = tempText


  let templang = selectTag[0].value        // exchange select tag
  console.log(templang)
  selectTag[0].value = selectTag[1].value
  selectTag[1].value = templang

  function rotateElement() {
    const currentRotation = parseInt(exchange.style.transform.replace('rotate(', '')) || 0;
    const newRotation = currentRotation + 270;
    exchange.style.transform = `rotate(${newRotation}deg)`;
  }
  rotateElement()
})

icons.forEach(icon => {
  icon.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains("fa-copy")) {
      if (target.id === "from") {
        navigator.clipboard.writeText(fromText.value)
      } else {
        navigator.clipboard.writeText(toText.value)
      }
    } else {
      let utterance;
      if (target.id === "from") {
        utterance = new SpeechSynthesisUtterance(fromText.value)
        utterance.lang = selectTag[0].value   //setting utterance language to fromSelect tag value
      } else {
        utterance = new SpeechSynthesisUtterance(toText.value)
        utterance.lang = selectTag[1].value   //setting utterance language to toSelect tag value
      }
      speechSynthesis.speak(utterance);       //speak the pass uttrance
    }
  });
});


translateBtn.addEventListener('click', () => {
  let text = fromText.value;
  translateForm = selectTag[0].value          //getting formslected tag value 
  translateTo = selectTag[1].value            //getting Toslected tag value 
  let url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateForm}|${translateTo}`
  fetch(url).then(res => res.json()).then(data => {
    console.log(data)
    toText.textContent = data.responseData.translatedText;
  })
})