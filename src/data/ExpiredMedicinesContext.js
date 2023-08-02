import React, { createContext, useState } from 'react';

const ExpiredMedicinesContext = createContext();

const ExpiredMedicinesProvider = ({ children }) => {
  const [expiredMedicinesCount, setExpiredMedicinesCount] = useState(0);

  return (
    <ExpiredMedicinesContext.Provider value={{ expiredMedicinesCount, setExpiredMedicinesCount }}>
      {children}
    </ExpiredMedicinesContext.Provider>
  );
};

export { ExpiredMedicinesContext, ExpiredMedicinesProvider };
