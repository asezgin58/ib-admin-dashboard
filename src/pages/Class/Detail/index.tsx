import {FC} from "react";
import {useHistory, useParams} from "react-router-dom";
import {useAxios} from "../../../_common/services/index";
import Button from "../../../components/Button/index";

/**
 * Component File Description
 */
const Index: FC<any> = () => {
    const {push}: any = useHistory();
    const {id}: any = useParams();

    const [{data: user}] = useAxios({
        url: "https://reqres.in/api/users/" + id,
        method: 'get'
    });

    return (
        <>
            <h1>Class Detail</h1>
            <div className="row mb-4">
                <div className="col">
                    {user?.data && <>
                        <div><strong>Id : </strong>{user.data.id}</div>
                        <div><strong>Name : </strong>{user.data.first_name}</div>
                        <div><strong>Surname : </strong>{user.data.last_name}</div>
                        <div><strong>Email : </strong>{user.data.email}</div>
                    </>}
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Button text=" Back to List" color="info" onClick={() => push('/class')}/>
                </div>
            </div>
        </>
    );
};

export default Index;