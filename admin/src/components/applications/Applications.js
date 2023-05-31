import {
  Datagrid,
  DateField,
  List,
  TextField,
  SimpleList,
  FunctionField
} from 'react-admin';
import { useMediaQuery } from "@mui/material"

export const ApplicationList = () => {

  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const handleDownloadResume = (url) => {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'http://' + url.replace(/\s/g, "");
    }
    window.open(url, '_blank');
  };

  return (
    <List
    // filters={applicationFilters}
    >
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.id}
          secondaryText={(record) => record.name}
          tertiaryText={(record) => (
            <button
              onClick={() => handleDownloadResume(record.resumeUrl)}
            >
              Download Resume
            </button>
          )}
        />
      ) : (
        <Datagrid rowClick="edit">
          <TextField source="id" />
          <TextField source="name" />
          <TextField source="phone" />
          <TextField source="resumeUrl" style={{ display: 'inline-block', maxWidth: '20em', overflow: 'hidden', textOverflow: 'ellipsis' }} />
          <DateField source="createdAt" />
          <DateField source="updatedAt" />
          <FunctionField
            label="Download Resume"
            render={(record) => (
              <button onClick={() => handleDownloadResume(record.resumeUrl)}>
                Download
              </button>
            )}
          />
        </Datagrid>
      )}
    </List>
  )
};

  // const applicationFilters = [
  //   <TextInput source="q" label="Search" alwaysOn />,
  //   <ReferenceInput source="category" label="Category" reference="applications/category" />,
  // ];