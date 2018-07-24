import React from 'react';
import { Switch } from 'react-router';
// import { TransitionGroup, CSSTransition } from "react-transition-group";
import RouteWithSubRoutes from 'components/RouteWithSubRoutes';
import MainHeader from './MainHeader';
import MainFooter from './MainFooter';
import styles from './style.css';

/**
 * @Todo 过度效果待优化
 */
class Layout extends React.PureComponent {
  render() {
    const { routes } = this.props;
    const { location } = this.props;
    return (
      <div className={styles.appMain}>
        <MainHeader />
        <div className={styles.mainBody}>
          {/* <TransitionGroup>
            <CSSTransition key={location.key} classNames="fade" timeout={300}> */}
          <Switch location={location}>
            {routes.map((route, i) => <RouteWithSubRoutes key={location.key} {...route} />)}
          </Switch>
          {/* </CSSTransition>
          </TransitionGroup> */}
        </div>
        <MainFooter />
      </div>
    );
  }
}

export default Layout;
