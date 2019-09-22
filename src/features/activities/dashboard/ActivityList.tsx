import React, { FC, useContext } from 'react';
import { Item, Button, Label, Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../app/stores/ActivityStore';
import { Link } from 'react-router-dom';

const ActivityList: FC = () => {
  const {
    activitiesByDate,
    isSubmitting,
    target,
    deleteActivity
  } = useContext(ActivityStore);
  return (
    <Segment clearing>
      <Item.Group divided>
        {activitiesByDate.map(activity => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  as={Link}
                  to={`/activities/${activity.id}`}
                  // onClick={() => setActivity(activity.id)}
                  content="View"
                  color="blue"
                  floated="right"
                />
                <Button
                  name={activity.id}
                  loading={isSubmitting && target === activity.id}
                  onClick={e => deleteActivity(e, activity.id)}
                  content="Delete"
                  color="red"
                  floated="right"
                />
                <Label content={activity.category} basic></Label>
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default observer(ActivityList);
