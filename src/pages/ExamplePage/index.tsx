import {useState} from "react";
import Button from "../../components/Button";
import {IExampleObj} from './type';

const ExamplePage = () => {

    const [ceyhun, setCeyhun] = useState<string>('Ceyhun Dağlı');

    let name: string = 'a';

    let exampleObj: IExampleObj | boolean | string | number = {
        name: 'a',
        surname: 'd',
    };

    console.log("--", exampleObj);

    return (
        <>
            <h1>{ceyhun}</h1>
            <h1>Name : {name}</h1>
            <Button
                text={"İsmi Değiştir"}
                onClick={() => {
                    setCeyhun('İsim Değişti');

                    name = 'Selam';
                    // exampleObj = 'Selam';
                    // exampleObj = 5;
                }}
            />
        </>
    );
};

export default ExamplePage;