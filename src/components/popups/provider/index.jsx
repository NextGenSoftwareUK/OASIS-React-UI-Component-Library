import React from 'react';
import ActivityPub from './components/ActivityPub';
import CompareProviderSpeeds from './components/CompareProviderSpeeds';
import Eosio from './components/Eosio';
import Ethereum from './components/Ethereum';
import Holochain from './components/Holochain';
import Ipfs from './components/Ipfs';
import ManageAutoFailOver from './components/ManageAutoFailOver';
import ManageAutoReplicaton from './components/ManageAutoReplicaton';
import ManageLoadBalancing from './components/ManageLoadBalancing';
import ManageProviders from './components/ManageProviders';
import MongoDb from './components/MongoDb';
import Neo4j from './components/Neo4j';
import SearchProviders from './components/SearchProviders';
import Seeds from './components/Seeds';
import Solid from './components/Solid';
import SqlLite from './components/SqlLite';
import ThreeFold from './components/ThreeFold';
import ViewProviders from './components/ViewProviders';
import ViewProviderStats from './components/ViewProviderStats';

class Provider extends React.Component {

    render() {
        const props = this.props;
        const { viewProviders } = this.props.providers;
        console.log(viewProviders)
        return(
            <>
                
                <ViewProviders
                    show={viewProviders}
                    hide={props.toggleScreenPopup}
                />
                <ManageProviders
                    show={props.providers.manageProviders}
                    hide={props.toggleScreenPopup}
                />
                <ManageAutoReplicaton
                    show={props.providers.manageAutoReplicaton}
                    hide={props.toggleScreenPopup}
                />
                <ManageAutoFailOver
                    show={props.providers.manageAutoFailOver}
                    hide={props.toggleScreenPopup}
                />
                <ManageLoadBalancing
                    show={props.providers.manageLoadBalancing}
                    hide={props.toggleScreenPopup}
                />
                <ViewProviderStats
                    show={props.providers.viewProviderStats}
                    hide={props.toggleScreenPopup}
                />
                <CompareProviderSpeeds 
                    show={props.providers.compareProviderSpeeds}
                    hide={props.toggleScreenPopup}
                />
                <SearchProviders
                    show={props.providers.searchProviders}
                    hide={props.toggleScreenPopup}
                />
                <Holochain
                    show={props.providers.holochain}
                    hide={props.toggleScreenPopup}
                />
                <Seeds
                    show={props.providers.seeds}
                    hide={props.toggleScreenPopup}
                />
                <Eosio
                    show={props.providers.eosio}
                    hide={props.toggleScreenPopup}
                />
                <Ethereum
                    show={props.providers.ethereum}
                    hide={props.toggleScreenPopup}
                />
                <Ipfs
                    show={props.providers.ipfs}
                    hide={props.toggleScreenPopup}
                />
                <ThreeFold
                    show={props.providers.threeFold}
                    hide={props.toggleScreenPopup}
                />
                <Solid
                    show={props.providers.solid}
                    hide={props.toggleScreenPopup}
                />
                <ActivityPub
                    show={props.providers.activityPub}
                    hide={props.toggleScreenPopup}
                />
                <MongoDb
                    show={props.providers.mongoDb}
                    hide={props.toggleScreenPopup}
                />
                <SqlLite
                    show={props.providers.sqlLite}
                    hide={props.toggleScreenPopup}
                />
                <Neo4j
                    show={props.providers.neo4j}
                    hide={props.toggleScreenPopup}
                />
                
            </>
        )
    }
}

export default Provider;