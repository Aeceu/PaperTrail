import { handleRefresh } from '@/actions/userActions';
import { setToken, setUser } from '@/store/slices/userSlice';
import { type AppDispatch } from '@/store/store';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

const PersistLayout = () => {
  const dispatch = useDispatch<AppDispatch>();

  useQuery({
    queryKey: ['refreshUser'],
    queryFn: handleRefresh,
    select: (data) => {
      dispatch(setUser(data.user));
      dispatch(setToken(data.accessToken));
    },
  });

  return <Outlet />;
};

export default PersistLayout;
