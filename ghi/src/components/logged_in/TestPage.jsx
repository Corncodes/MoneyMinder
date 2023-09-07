//Template page
import { useStore } from "../../ContextStore.jsx";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

const TestPage = () => {
  const { token } = useAuthContext()
  const [decodedToken, setDecodedToken] = useState('')

  function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  useEffect(() => {
    if (token) {
      setDecodedToken(parseJwt(token))
    }
  }, [token])

  console.log(decodedToken.account);

  return (
    <p>
      Check the console
    </p>
  );
}

export default TestPage
