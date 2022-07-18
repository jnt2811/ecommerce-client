import { AntdConfig } from "./AntdConfig";
import { ApolloConfig } from "./ApolloConfig";
import { MomentConfig } from "./MomentConfig";
// import { AuthProvider } from "./AuthProvider";

export const AppConfig = ({ children }) => {
  return (
    <MomentConfig>
      <AntdConfig>
        {/* <AuthProvider> */}
        <ApolloConfig>{children}</ApolloConfig>
        {/* </AuthProvider> */}
      </AntdConfig>
    </MomentConfig>
  );
};
