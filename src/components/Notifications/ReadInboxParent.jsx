import React, { useEffect, useState } from 'react';
import ReadInbox from './ReadInbox';

const ParentComponent = () => {
  const [medicines, setMedicines] = useState([]);

  // Fetch the medication data from the JSON server and set it in the state
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await fetch('http://localhost:8000/AllMedicines');
        if (!response.ok) {
          throw new Error('Failed to fetch medication data.');
        }
        const data = await response.json();
        setMedicines(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMedicines();
  }, []);

  return (
    // ...
    <ReadInbox medicines={medicines} />
    // ...
  );
};

export default ParentComponent;
