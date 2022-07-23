import { TokenProvider } from "./Token";
import { SearchHomeProvider } from "./SearchHome";
import { SelectValuesProvider } from "./SelectValues";
import { DashboardPageControllerProvider } from "./DashboardPageController";
import { IsLoggedProvider } from "./isLogged";
import { ShowcaseProvider } from "./showcase";
import { ProvidersListProvider } from "./ProvidersList";
import { StockProvider } from "./Stock";
import { DashFilterProvider } from "./DashboardFilter";
import { UserProvider } from "./Users";

const Providers = ({ children }) => {
  return (
    <TokenProvider>
      <UserProvider>
        <StockProvider>
          <ShowcaseProvider>
            <IsLoggedProvider>
              <DashFilterProvider>
                <SearchHomeProvider>
                  <SelectValuesProvider>
                    <ProvidersListProvider>
                      <DashboardPageControllerProvider>

                        {children}

                      </DashboardPageControllerProvider>  
                    </ProvidersListProvider>    
                  </SelectValuesProvider>
                </SearchHomeProvider>
              </DashFilterProvider> 
            </IsLoggedProvider>
          </ShowcaseProvider>
        </StockProvider>
      </UserProvider>
    </TokenProvider>
  );
};

export default Providers;
