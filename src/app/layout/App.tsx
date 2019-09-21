import React, { useState, useEffect, Fragment, MouseEvent } from 'react';
import { IActivity } from '../models/activity';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import Loading from './Loading';
import agent from '../api/agent';

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState('');
  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter(activity => activity.id === id)[0]);
    setEditMode(false);
  };
  const handleOpenForm = (): void => {
    setSelectedActivity(null);
    setEditMode(true);
  };
  const handleCreateActivity = (activity: IActivity): void => {
    setSubmitting(true);
    agent.Activities.create(activity)
      .then(() => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };
  const handleEditActivity = (activity: IActivity): void => {
    setSubmitting(true);
    agent.Activities.update(activity)
      .then(() => {
        setActivities([
          ...activities.filter(a => a.id !== activity.id),
          activity
        ]);
        setSelectedActivity(activity);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };
  const handleDeleteActivity = (
    e: MouseEvent<HTMLButtonElement>,
    id: string
  ): void => {
    const { name } = e.currentTarget;
    setTarget(name);
    setSubmitting(true);
    agent.Activities.delete(id)
      .then(() => {
        setActivities(activities.filter(activity => activity.id !== id));
      })
      .then(() => setSubmitting(false));
  };
  useEffect((): void => {
    setLoading(true);
    agent.Activities.list()
      .then(res => {
        const activities = res.map(activity => {
          activity.date = activity.date.split('.')[0];
          return activity;
        });
        setActivities(activities);
      })
      .then(() => {
        setLoading(false);
      });
  }, []);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <Fragment>
      <NavBar handleOpenForm={handleOpenForm} />
      <ActivityDashboard
        activities={activities}
        selectedActivity={selectedActivity}
        handleSelectActivity={handleSelectActivity}
        editMode={editMode}
        setEditMode={setEditMode}
        setSelectedActivity={setSelectedActivity}
        handleCreateActivity={handleCreateActivity}
        handleEditActivity={handleEditActivity}
        handleDeleteActivity={handleDeleteActivity}
        isSubmitting={isSubmitting}
        target={target}
      />
    </Fragment>
  );
};

export default App;
