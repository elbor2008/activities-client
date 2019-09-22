import React, { FC, useContext, useEffect } from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import ActivityStore from '../../../app/stores/ActivityStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps, Link } from 'react-router-dom';
import Loading from '../../../app/layout/Loading';

const ActivityDetails: FC<RouteComponentProps<{ id: string }>> = ({
  match,
  history
}) => {
  const { selectedActivity, loadActivity, isLoading } = useContext(
    ActivityStore
  );
  useEffect(() => {
    loadActivity(match.params.id);
  }, [loadActivity, match.params.id]);
  if (isLoading || !selectedActivity) {
    return <Loading />;
  }
  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${selectedActivity.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{selectedActivity.title}</Card.Header>
        <Card.Meta>{selectedActivity.date}</Card.Meta>
        <Card.Description>{selectedActivity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            as={Link}
            to={`/manageActivity/${selectedActivity.id}`}
            basic
            color="blue"
          >
            Edit
          </Button>
          <Button
            onClick={() => history.push('/activities')}
            basic
            color="grey"
          >
            Cancel
          </Button>
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(ActivityDetails);
