import { useState } from 'react';

interface TypeState<T> {
  loading: boolean;
  data?: T; 
  error?: object;
}
type TypeResult<T> = [(data?: any) => void, TypeState<T>];

export default function useMutation<T = any>(url: string): TypeResult<T> {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<undefined | any>(undefined);
  const [error, setError] = useState<undefined | any>(undefined);
  
  function mutation(data?: any) {

    setLoading(true);

    fetch(url, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },// nextjs 인코딩
      body: JSON.stringify(data),
    })
    .then( (response) => response.json().catch(() => {}) )// return
    .then( result => setData(result) )
    .catch( err => setError(err) )

    .finally( () => setLoading(false) )
  }

  return [mutation, { loading, data, error }] ;
}
 
