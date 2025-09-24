import { createContext, useState, useEffect } from 'react';

const DataContext = createContext();

const defaultWheelOptions = [];

const defaultWheelConfig = {
  backgroundColors: ['#ff8f43', '#70bbe0', '#f9dd50', '#ef476f', '#06d6a0', '#118ab2'],
  textColors: ['#ffffff'],
  outerBorderColor: '#ccc',
  outerBorderWidth: 10,
  innerBorderColor: '#f2f2f2',
  innerBorderWidth: 30,
  radiusLineColor: '#dedede',
  radiusLineWidth: 10,
  spinDuration: 0.5,
  wheelScale: 1.5
};

const loadFromLocalStorage = (key, defaultValue) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

export function DataProvider({ children }) {
  const [wheelOptions, setWheelOptionsState] = useState(() => 
    loadFromLocalStorage('russianRoulette_wheelOptions', defaultWheelOptions)
  );
  const [sessionActive, setSessionActive] = useState(false);
  const [wheelConfig, setWheelConfigState] = useState(() => 
    loadFromLocalStorage('russianRoulette_wheelConfig', defaultWheelConfig)
  );

  const setWheelOptions = (newOptions) => {
    setWheelOptionsState(newOptions);
  };

  const setWheelConfig = (newConfig) => {
    const updatedConfig = typeof newConfig === 'function' ? newConfig(wheelConfig) : newConfig;
    setWheelConfigState(updatedConfig);
  };

  useEffect(() => {
    const hasStoredData = localStorage.getItem('russianRoulette_wheelOptions') || localStorage.getItem('russianRoulette_wheelConfig');
    if (hasStoredData) {
      console.log('Configuraciones cargadas desde localStorage');
    } else {
      saveToLocalStorage('russianRoulette_wheelOptions', wheelOptions);
      saveToLocalStorage('russianRoulette_wheelConfig', wheelConfig);
    }
  }, []);

  const saveConfigurations = () => {
    saveToLocalStorage('russianRoulette_wheelOptions', wheelOptions);
    saveToLocalStorage('russianRoulette_wheelConfig', wheelConfig);
  };

  const startSession = () => {
    setSessionActive(true);
  };

  const endSession = () => {
    setSessionActive(false);
  };

  return (
    <DataContext.Provider value={{ 
      wheelOptions, 
      setWheelOptions,
      wheelConfig,
      setWheelConfig,
      sessionActive,
      startSession,
      endSession,
      saveConfigurations
    }}>
      {children}
    </DataContext.Provider>
  );
}

export default DataContext;
