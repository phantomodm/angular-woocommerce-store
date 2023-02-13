export const environment = {
  production: false,
  firebase: {
    projectId: 'nys-custom-ui',
    appId: '1:946748632034:web:aac02bf3a97c0b971ce7bb',
    storageBucket: 'nys-custom-ui.appspot.com',
    locationId: 'us-east1',
    apiKey: 'AIzaSyCEmZV_arlakRS_4aEmK7InwXRXAMfIybk',
    authDomain: 'nys-custom-ui.firebaseapp.com',
    messagingSenderId: '946748632034',
    measurementId: 'G-ZY74EENWC4',
  },
  footerLinks: [
    { title: 'ABOUT', hasSublinks: true, style: 'col-2',
      subLink:[
        {title: "Company", url:"/about"},
        {title: "Orders", url:"/my-account"},
        {title: "Quality", url:"#"},
        {title: "Privacy Policy", url:"/privacy-policy"},
        {title: "Gift Cards", url:"/gift-cards"},
      ]
    },
    { title: 'HELP', hasSublinks: true, style: 'col-2 offset-1',
      subLink:[
        {title: "My Account", url:"/about"},
        {title: "Customer Help", url:"/my-account"},
        {title: "Contact Us", url:"/contact-us"},
        {title: "Terms & Conditions", url:"/terms-and-conditions"},
        {title: "FAQ", url:"/frequently-asked-questions"},
      ]
    },
    { title: 'ABOUT', hasSublinks: true, style: 'col-2 offset-1',
      subLink:[
        {title: "Facebook", url:"https://facebook.com"},
        {title: "Orders", url:"https://twitter.com/"},
        {title: "Quality", url:"https://instagram.com/"},
        {title: "Privacy Policy", url:"https://pinterest.com"}
      ]
    }
  ],
  googleMapApi: 'AIzaSyDyPjkNb9TqUc_In5f2rOdoYBqk4AfTMKs',
  mainNavMenu: [
    {title: 'Home', hasSublinks: false, url: '/', style: '',
     subLinks: [] },
     {title: 'Shop', hasSublinks: false, url: '/shop', style: '',
     subLinks: [] },
     {title: 'Men', hasSublinks: false, url: '/mens', style: '',
     subLinks: [] },
     {title: 'Women', hasSublinks: false, url: '/women', style: '',
     subLinks: [] },
     {title: 'Blog', hasSublinks: false, url: '/blog', style: '',
     subLinks: [] },
     {title: 'Contact', hasSublinks: false, url: '/contact-us', style: '',
     subLinks: [] }
  ],
  productPageTabs:[
    {id: 'description', ariaControls: 'description',ariaSelected: "true" },
    {id: 'product-info', ariaControls: 'product-info',ariaSelected: "false"},
    {id: 'reviews', ariaControls: 'reviews',ariaSelected: "false"}
  ],
  siteLogo: '../assets/images/shoptimizer_logo.png',
  topBarLeft: 'Contact us: (123)-456-7890',
  topBarMiddle: 'Free Shipping on all orders over $99',
  topBarRight: 'Placeholder'
}
