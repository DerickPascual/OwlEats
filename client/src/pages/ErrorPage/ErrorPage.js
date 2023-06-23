import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div>
            <h2>Oops, an unexpected error has occurred.</h2>
            <p>{error.statusText || error.message}</p>
        </div>
    )
}