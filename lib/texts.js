export const es = {
  common: {
    save: "Guardar",
    loading: "Cargando...",
    dataLoading: "Cargando los datos",
    error:
      " Parece que hubo un error con nuestros servidores, estamos trabajando para solucionarlo lo antes posible",
  },
  navBar: {
    registerExp: "Registrar Gasto",
    stats: "Estadísticas",
    exp: "Gastos",
  },
  loginTitle: "INGRESO",
  loginFooter: [
    "No tienes cuenta aún?",
    "Empieza a tomar el control de tu dinero presionando",
    "aquí",
  ],
  signUp: {
    title: "REGISTRO",
    footer: ["Ya tienes una cuenta?", "Ingresa", "aquí"],
  },
  saveExpenses: {
    headers: ["Tipo", "Descripción", "Monto"],
    error: "Porfavor llena todas las casillas anteriores para proceder",
    //it's neccesary to translate keys and values since both are displayed
    expensesList: {
      Alimentación: ["Carne", "Legumbres", "Huevos", "Vegetales", "Frutas"],
      Farmacia: [],
      "Servicios Básicos": [
        "Agua Potable",
        "Energía Eléctrica",
        "Internet",
        "Gas",
      ],
      Vestimenta: [
        "Zapatos",
        "Camisas/Blusas",
        "Pantalones",
        "Abrigos",
        "Otros",
      ],
      Ocio: ["Películas", "Videojuegos", "Viajes"],
      Mascotas: ["Comida", "Accesorios", "Medicinas"],
      Donaciones: [],
      Otros: [],
    },
  },
  statistics: {
    chartHeader: "Monto acumulado por cada tipo de gasto por mes",
    startTime: "Fecha Inicio",
    endTime: "Fecha Final",
    load: "Cargar",
    newColrs: "Generar nuevos colores",
  },
  book: {
    download: "Descargar en excel",
    tHeaders: ["Fecha", "Tipo", "Descripción", "Monto"],
  },
  logNeeded: [
    "Vaya!",
    "Parece que no te has autentificado, por favor",
    "ingresa aquí",
  ],
  noExpenses: [
    "Vaya!",
    "Parece que eres nuev@ por aquí, comienza introduciendo algunos gastos en la sección 'Registrar Gasto'",
  ],
};

export const en = {
  common: {
    save: "Save",
    loading: "Loading ...",
    dataLoading: "Loading the data",
    error:
      "It seems that there was an error with our servers, we are working to fix it as soon as possible",
  },
  navBar: { registerExp: "Register Expense", stats: "Stats", exp: "Expenses" },
  loginTitle: "LOG IN",
  loginFooter: [
    "Don't you have an account yet?",
    "Start taking control of your money by pressing",
    "here",
  ],
  signUp: {
    title: "REGISTRATION",
    footer: ["Do you already have an account?", "Login", "here"],
  },
  saveExpenses: {
    headers: ["Type", "Description", "Amount"],
    error: "Please fill in all the above fields to proceed",
    // it's neccesary to translate keys and values ​​since both are displayed
    expensesList: {
      Food: ["Meat", "Legumes", "Eggs", "Vegetables", "Fruits"],
      Pharmacy: [],
      "Basic services": ["Drinking water", "Electric power", "Internet", "Gas"],
      Clothing: ["Shoes", "Shirts/Blouses", "Jeans", "Coats", "Others"],
      Leisure: ["Movies", "Videogames", "Travel"],
      Pets: ["Food", "Accessories", "Medicines"],
      Donations: [],
      Others: [],
    },
  },
  statistics: {
    chartHeader: "Amount accumulated for each type of expense per month",
    startTime: "Start Date",
    endTime: "End Date",
    load: "Load",
    newColrs: "Generate new colors",
  },
  book: {
    download: "Download excel",
    tHeaders: ["Date", "Type", "Description", "Amount"],
  },
  logNeeded: [
    "Oh!",
    "It seems that you have not authenticated yourself, please",
    "enter here",
  ],
  noExpenses: [
    "Oh!",
    "It seems that you are new around here, start by entering some expenses in the 'Register Expense' section",
  ],
};
