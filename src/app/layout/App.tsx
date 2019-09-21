import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { IActivity } from '../models/activity';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);
  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter(activity => activity.id === id)[0]);
    setEditMode(false);
  };
  const handleOpenForm = (): void => {
    setSelectedActivity(null);
    setEditMode(true);
  };
  const handleCreateActivity = (activity: IActivity): void => {
    setActivities([...activities, activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  };
  const handleEditActivity = (activity: IActivity): void => {
    setActivities([...activities.filter(a => a.id !== activity.id), activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  };
  const handleDeleteActivity = (id: string): void => {
    setActivities(activities.filter(activity => activity.id !== id));
  };
  useEffect((): void => {
    axios.get<IActivity[]>('http://localhost:5000/api/activities').then(res => {
      const activities = res.data.map(activity => {
        activity.date = activity.date.split('.')[0];
        return activity;
      });
      setActivities(activities);
    });
  }, []);
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
      />
    </Fragment>
  );
};

export default App;
