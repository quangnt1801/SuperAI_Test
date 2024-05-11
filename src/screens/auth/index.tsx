import { connect } from "react-redux";
import { updateAuthentication } from "../../services/store/sagas/actions";
import { ROOT_STATE } from "../../services/store/sagas/rootSaga";
import { AUTHENTICATION_STATE } from "../../services/store/sagas/type";
import LoginScreen from "./login/LoginScreen";

const mapStateToProps = (state: ROOT_STATE) => {
    return {
        authen: state.authentication
    }
}

const mapDispatchToProps = (dispatch: Function) => {
    return {
        updateAuthen: (config: AUTHENTICATION_STATE) => { dispatch(updateAuthentication(config)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)