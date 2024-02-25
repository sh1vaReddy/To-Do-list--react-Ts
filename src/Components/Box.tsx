

type InputValType = string | number;

const Box = <T extends InputValType>({
  label,
  value,
  onChange
}: {
  label: string,
  value: T,
  onChange: (value: T) => void 
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value as T); 
  };

  return (
    <>
      <form>
        <label>{label}</label> 
        <input type="text" value={value} onChange={handleChange} /> 
        <button type="submit">submit</button>
      </form>
    </>
  );
};

export default Box;
