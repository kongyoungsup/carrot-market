module.exports = {    //page 폴더 / **(모든폴더) / *.{(사용할 파일)})
  content: [ 
    "./pages/**/*.{js,jsx,ts,tsx}",             
    "./components/**/*.{js,jsx,ts,tsx}"
  ],  
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    // ...
  ],
};


