import { AntdConfig } from "./AntdConfig";
import { ApolloConfig } from "./ApolloConfig";
import { AuthProvider } from "./AuthProvider";
import { MomentConfig } from "./MomentConfig";

export const AppConfig = ({ children }) => {
  return (
    <MomentConfig>
      <AntdConfig>
        <AuthProvider>
          <ApolloConfig>{children}</ApolloConfig>
        </AuthProvider>
      </AntdConfig>
    </MomentConfig>
  );
};
