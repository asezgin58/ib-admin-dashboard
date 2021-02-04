import {FC} from "react";
import {useParams} from "react-router-dom";
import {useAxios} from "../../../_common/services";
import DetailForm from './Form';

/**
 * Component File Description
 */
const Index: FC<any> = () => {
    const {oid}: any = useParams();
  
    const [{data, loading}] = useAxios({
        url: "http://localhost:8080/api/v1/dict_ml_classes/"+oid,
        method: 'get'
    });

    return (
        <>
            <h1>DICT_ML_CLASS Detail for {oid}</h1>

            {!loading && <DetailForm formData={data}/>  }        
        </>
    );
};

export default Index;