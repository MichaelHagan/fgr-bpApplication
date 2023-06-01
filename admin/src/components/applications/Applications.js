import {
    useRecordContext,
    Datagrid,
    DateField,
    List,
    TextField,
    Edit,
    Create,
    SimpleForm,
    TextInput,
    maxLength,
    FunctionField,
    Filter
  } from 'react-admin';
  const validateName = maxLength(30, "Maximum number of characters exceeded.(max:30 characters)");
  const validatePhoneNumber = maxLength(14, "Maximum number of characters exceeded.(max:14 characters)");
  
  export const ApplicationList = () => {

    const handleDownloadResume = (url) => {
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'http://' + url.replace(/\s/g, "");
      }
      window.open(url, '_blank');
    };

    return (
      <List
        filters={< ApplicationFilter />}
      >
          <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="phone" />
            <DateField source="createdAt" />
            <DateField source="updatedAt" />
            <FunctionField
            label="Download Resume"
            render={(record) => (
              <button onClick={(e) => {
                e.stopPropagation();
                handleDownloadResume(record.resumeUrl)}}>
                Download
              </button>
            )}
          />
          </Datagrid>
      </List>
    )
  };
  
  
  export const ApplicationEdit = () => {
  
    return (
      <Edit title={<ApplicationTitle />}>
      <SimpleForm>
        <TextInput source="id" style={{ width: '10%' }}/>
        <TextInput source="name" validate={validateName} style={{ width: '40%' }}/>
        <TextInput source="phone" validate={validatePhoneNumber} style={{ width: '40%' }}/>
        <TextInput source="resumeUrl" style={{ width: '100%' }} label="Current Resume Url" disabled />
      </SimpleForm>
    </Edit>
    )
  };
  
  export const ApplicationCreate = () => (
    <Create>
      <SimpleForm>
        <TextInput source="id" style={{ width: '10%' }}/>
        <TextInput source="name" validate={validateName} style={{ width: '40%' }}/>
        <TextInput source="phone" validate={validatePhoneNumber} style={{ width: '40%' }}/>
        <TextInput source="resumeUrl" style={{ width: '100%' }} label="Current Resume Url" disabled />
      </SimpleForm>
    </Create>
  );
  
  const ApplicationTitle = () => {
    const application = useRecordContext();
    return <span>{application ? `${application.name}` : ''}</span>;
  };

  const ApplicationFilter = (props) => (
    <Filter {...props}>
      <TextInput label="Search by ID" source="id" alwaysOn />
    </Filter>
  );
  