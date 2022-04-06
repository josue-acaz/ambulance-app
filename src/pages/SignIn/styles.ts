import styled from "styled-components";

const SignInView = styled.div`
    height: 100vh;
    width: 100%;
    background-color: #f1f1f1;
    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 1200px)
    {
        padding-left: 10px;
        padding-right: 10px;
    }
`;

const SignInCard = styled.div`
    height: auto;
    width: 500px;
    background-color: #FFFFFF;
    border-radius: 0px;
    padding: 1rem;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 4px 10px 0 rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
    margin-bottom: 10px;
    text-align: center;
`;

const Title = styled.p`
    font-size: 20px;
    font-weight: bold;
    color: #333333;
`;

const Subtitle = styled.p`
    font-size: 16px;
    color: #666666;
`;

const LogoView = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const Logo = styled.img`
    width: 150px;
    height: 150px;
    object-fit: contain;
`;

export {
    SignInView,
    SignInCard,
    Header,
    Title,
    Subtitle,
    LogoView,
    Logo
};