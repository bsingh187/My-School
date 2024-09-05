import React, { Suspense } from 'react';
import Spinner from 'react-bootstrap/Spinner';
// ==============================|| LOADABLE - LAZY LOADING ||============================== //

const Loadable = (Component: any) => (props: any) =>
  (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );


const Loader = ({customClassName = null}: any) => {
  return (
    <>
      <div className={`centerPage ${customClassName || 'height100'}`}>
        <Spinner animation="border" variant="info" />
      </div>
    </>
  )
}

export {Loader};
export default Loadable;
