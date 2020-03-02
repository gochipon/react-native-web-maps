// @ts-check
import React, { Component } from "react";
import { Marker, OverlayView } from "react-google-maps";

class MapViewMarker extends Component {
  state = {
    isOpen: false
  };
  showCallout() {
    this.setState({ isOpen: true });
  }
  hideCallout() {
    this.setState({ isOpen: false });
  }
  render() {
    const {
      description,
      title,
      coordinate,
      children,
      onPress,
      ...rest
    } = this.props;
    if (children) {
      const wrappedChildren = onPress ? (
        <div
          ref={ref => ref && google.maps.OverlayView.preventMapHitsFrom(ref)}
          onClick={onPress}
        >
          {children}
        </div>
      ) : (
        children
      );
      return (
        <OverlayView
          {...rest}
          title={description ? `${title}\n${description}` : title}
          position={{ lat: coordinate.latitude, lng: coordinate.longitude }}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          {wrappedChildren}
        </OverlayView>
      );
    }

    const childrenWithProps = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        hideCallout: this.hideCallout.bind(this)
      });
    });

    return (
      <Marker
        {...rest}
        title={description ? `${title}\n${description}` : title}
        position={{ lat: coordinate.latitude, lng: coordinate.longitude }}
        onClick={onPress}
      >
        {this.state.isOpen && childrenWithProps}
      </Marker>
    );
  }
}

export default MapViewMarker;
