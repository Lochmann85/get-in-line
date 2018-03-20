const propOrDefault = (properties, searchedPropertyName, defaultProp) => {
   if (properties) {
      const property = properties[searchedPropertyName];
      return property ? property : defaultProp;
   }
   return defaultProp;
};

export default propOrDefault;