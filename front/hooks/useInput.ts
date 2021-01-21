import React, { useState, useCallback } from "react";

type onChangeType = (e: React.ChangeEvent<HTMLInputElement>) => void;

const useInput = (initialValue = null) => {
  const [value, setValue] = useState<string>(initialValue);
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  return [value, onChange] as [string, onChangeType];
};

export default useInput;
