import { fetchUtils, Admin, Resource } from "react-admin";
import { ApplicationList } from "./components/applications/Applications";
import {AdminList, AdminEdit, AdminCreate} from "./components/admins/Admins";
import LoginPage from "./components/login/LoginPage";
import Provider from "./dataProvider.ts";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { Dashboard } from "./components/dashboard/Dashboard";
import { authProvider } from './authProvider';

const httpClient = (url, options = {}) => {
  if (!options.headers) {
      options.headers = new Headers({ Accept: 'application/json' });
  }
  const  token  = localStorage.getItem('auth');
  options.headers.set('authorization', `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
};

const dataProvider = Provider('https://fgrbpresume.onrender.com', httpClient);

const App = () => (

   <Admin 
   authProvider={authProvider} 
   dataProvider={dataProvider}
   loginPage={LoginPage} 
   dashboard={Dashboard}
   >
    <Resource 
    name="applications" 
    list={ApplicationList} 
    icon={WorkOutlineIcon} 
    />

    <Resource 
    name="admins" 
    list={AdminList} 
    edit={AdminEdit}  
    create={AdminCreate}
    icon={AdminPanelSettingsIcon} 
    />

   </Admin>
  );

export default App;