import AuthContextProvider from "./AuthContext";

function ContextProvider({ children }) {
	return <AuthContextProvider>{children}</AuthContextProvider>;
}

export default ContextProvider;
