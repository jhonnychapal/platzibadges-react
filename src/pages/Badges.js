import React from 'react';

import BadgesList from '../components/BadgesList';
import './styles/Badges.css';
import confLogo from '../images/badge-header.svg';
import PageLoading from '../components/PageLoading'
import PageError from '../components/PageError'
import api from '../api';
import {Link} from 'react-router-dom';
import MiniLoader from '../components/MiniLoader';

class Badges extends React.Component {

    state = {
        loading: true,
        error: null,
        data: undefined
    }
    

    constructor (props) {
        super(props);
        console.log('1. constructor()')
    }

    componentDidMount() {
        console.log('3. componentDidMount()')
        this.fetchData();
        
        this.intervalId = setInterval(this.fetchData, 5000);
    }

    fetchData = async () => {
        this.setState({ loading: true, error: null })

        try {
            const data = await api.badges.list();
            this.setState({ loading: false, data: data });
        } catch (error) {
            this.setState({ loading: false, error: error });
        }
    }

    componentDidUpdate (prevProps, prevState) {
        console.log('5. componentDidUpdate()');
        console.log({
            prevProps: prevProps, prevState: prevState
        })

        console.log({
            props: this.props,
            state: this.state,
        })
    }

    componentWillUnmount () {
        console.log('6. componentWillUnmount')
        clearTimeout(this.timeoutId)
        clearInterval(this.intervalId);
    }

    render() {
        if (this.state.loading === true && !this.state.data) {
            return <PageLoading />;
        }

        if (this.state.error) {
            return <PageError error={this.state.error} />;
        }

        console.log('2/4. render()')
        return (
            <React.Fragment>
                <div className="Badges">
                    <div className="Badges__hero">
                        <div className="Badges__container">
                            <img 
                                className="Bades_conf-logo" 
                                src={confLogo} 
                                alt="Conf Logo" 
                            />
                        </div>
                    </div>
                </div>

                <div className="Badge__container">
                    <div className="Badges__buttons">
                        <Link className="btn btn-primary" to="/badges/new">
                            New Badge
                        </Link>
                    </div>
                </div>

                <div className="Badges__list">
                    <div className="Badges__container">
                        <BadgesList badges={this.state.data} />
                        {this.state.loading && <MiniLoader />}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Badges;
