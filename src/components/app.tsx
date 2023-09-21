import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { ZakekeEnvironment, ZakekeViewer, ZakekeProvider } from 'zakeke-configurator-react';
import Selector from './selector';

const Layout = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 40px;
    height: 100%;
    padding: 40px;
    background-color: var(--template-background-color);
`

const zakekeEnvironment = new ZakekeEnvironment();

const App: FunctionComponent<{}> = () => {
    return <ZakekeProvider environment={zakekeEnvironment}>
        <Layout>
            <div><ZakekeViewer /></div>
            <Selector />
        </Layout>
    </ZakekeProvider>;
}

export default App; 