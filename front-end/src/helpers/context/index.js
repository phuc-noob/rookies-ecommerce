import AuthContextProvider from "./authContext";

function ContextProvider({ children }) {
	return <AuthContextProvider>{children}</AuthContextProvider>;
}

export default ContextProvider;
