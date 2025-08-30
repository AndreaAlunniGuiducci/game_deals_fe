import Button from "../../components/atoms/button";
import InputSelect from "../../components/atoms/inputSelect";
import InputText from "../../components/atoms/inputText";

const Test = () => {
  return (
    <div>
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <InputText label="LAbel" placeholder="input" error="Errore"/>
      <InputSelect options={[{label: "Label", value: 'Value'}]} label="Lable input" error='ERRORE'/>
    </div>
  );
};

export default Test;
