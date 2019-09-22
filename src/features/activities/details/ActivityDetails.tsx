import React, { FC, useContext } from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import ActivityStore from '../../../app/stores/ActivityStore';
import { observer } from 'mobx-react-lite';

const ActivityDetails: FC = () => {
  const { selectedActivity, setEditMode, cancelForm } = useContext(
    ActivityStore
  );
  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${selectedActivity!.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{selectedActivity!.title}</Card.Header>
        <Card.Meta>{selectedActivity!.date}</Card.Meta>
        <Card.Description>{selectedActivity!.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button onClick={() => setEditMode(true)} basic color="blue">
            Edit
          </Button>
          <Button onClick={cancelForm} basic color="grey">
            Cancel
          </Button>
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(ActivityDetails);
