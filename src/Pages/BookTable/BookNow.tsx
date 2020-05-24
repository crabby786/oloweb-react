import React, { Component } from 'react'
import Container from '@material-ui/core/Container';
import { PrettoSlider } from '../../Components/CustomSlider';
import { ButtonGroup, Button, Chip, MenuItem, Menu, Fade, FormControlLabel, Checkbox, TextField } from '@material-ui/core';
import { cuisineList } from '../../Constants/DishCoApi';



export default class BookNow extends Component<any, any> {
    state = {
        guestNumber: 1,
        allCuisines: ['All Cusines'],
        favCuisines: ['Favourite Cuisines'],
        chooseCuisines: [] ,
        cuisines: { selected: 0, chips: [] },
        cuisineMenuAnchor: null as null | HTMLElement,
        rests: { selected: 1, chips: ['All in City'] },
    }
    componentDidMount = () => {
        this.setState((prev) => {
            return {
                ...prev,
                cuisines: { ...prev.cuisines, chips: prev.allCuisines }
            }
        })
    }
    handleNearMe = () => { 
        this.setState({
            ...this.state,
            rests:{selected:0, chips:['5 Km']}
        })
    }
    handleAllInCity = () => { 
        this.setState({
            ...this.state,
            rests:{selected:1, chips:['All In City']}
        })
     }
    handleSelectRests = () => { 
        this.setState({
            ...this.state,
            rests:{selected:2, chips:[]}
        })
     }
    showCusines = (event) => {
        this.setState({
            ...this.state,
            cuisineMenuAnchor: event.currentTarget,
            cuisines: { ...this.state.cuisines, selected: 2 }
        })
    };

    closeMenu = (event, key: string) => {
        this.setState({
            ...this.state,
            [key]: null
        })
    };
    addCuisines = (value: string, e) => {
        let isChecked = e.currentTarget.checked;
        if (isChecked) {
            this.setState((prev) => {
                prev.chooseCuisines.push(value);
                return {
                    ...prev,
                    cuisines: { ...prev.cuisines, chips: [...prev.chooseCuisines] }
                }
            })
        }
        else {
            this.setState((prev) => {
                let index = prev.chooseCuisines.indexOf(value);
                prev.chooseCuisines.splice(index, 1);
                return {
                    ...prev,
                    cuisines: { ...prev.cuisines, chips: [...prev.chooseCuisines] }
                }
            })
        }
    }
    selectAllCuisines = () => {
        this.setState({
            ...this.state,
            cuisines: { ...this.state.cuisines, chips: this.state.allCuisines, selected: 0 }
        })
    }
    selectFavCuisines = () => {
        this.setState({
            ...this.state,
            cuisines: { ...this.state.cuisines, chips: this.state.favCuisines, selected: 1 }
        })
    }


    render() {

        const openCuisineMenu = Boolean(this.state.cuisineMenuAnchor);
        return (
            <Container maxWidth="sm" id='bookNow-container' >
                <h4>Number of Guests?</h4>
                <PrettoSlider className='guestSlider' aria-label="ios slider" defaultValue={4}
                    min={0}
                    max={30} valueLabelDisplay="on" />
                <div className="selectors" >
                    <h4>Cuisines</h4>
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                        <Button className={this.state.cuisines.selected === 0 ? 'active' : ''} onClick={this.selectAllCuisines}>All</Button>
                        <Button className={this.state.cuisines.selected === 1 ? 'active' : ''} onClick={this.selectFavCuisines} >My Favourite </Button>
                        <Button
                            className={this.state.cuisines.selected === 2 ? 'active' : ''}
                            onClick={this.showCusines}
                        > Choose </Button>
                    </ButtonGroup>
                    <Menu
                        id="fade-menu"
                        anchorEl={this.state.cuisineMenuAnchor}
                        keepMounted
                        open={openCuisineMenu}
                        onClose={(event) => this.closeMenu(event, 'cuisineMenuAnchor')}
                        TransitionComponent={Fade}
                    >
                        {cuisineList.map((cuisine, i: number) => (
                            <MenuItem key={'cuisine' + i}>
                                <FormControlLabel
                                    control={<Checkbox checked={this.state.chooseCuisines.indexOf(cuisine) !== -1}
                                        onChange={(event) => this.addCuisines(cuisine, event)}
                                        value={cuisine} />}
                                    label={cuisine}
                                />
                            </MenuItem>
                        ))}
                    </Menu>

                </div>
                <div className='chip-container'>
                    {this.state.cuisines.chips.length ? this.state.cuisines.chips.map((data, i) => (
                        <Chip
                            key={i}
                            label={data} color="secondary" variant="outlined"
                        />
                    )) : ""}
                </div>
                <div className="selectors">
                    <h4>Restaurants</h4>
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                        <Button className={this.state.rests.selected === 0 ? 'active' : ''} onClick={(e) =>this.handleNearMe()}>Near Me</Button>
                        <Button className={this.state.rests.selected === 1 ? 'active' : ''} onClick={(e) =>this.handleAllInCity()}>All in City</Button>
                        <Button className={this.state.rests.selected === 2 ? 'active' : '' }onClick={(e) => this.handleSelectRests()}
                        >Select</Button>
                    </ButtonGroup>
                <div className='chip-container'>
                    { this.state.rests.chips.length ? this.state.rests.chips.map((data, i) => (
                        <Chip
                            key={i}
                            label={data} color="secondary" variant="outlined"
                        />
                    )) : <div className='mt-2' ><TextField placeholder="Search Restaurants" fullWidth ></TextField> </div>}
                </div>
                </div>
            <Button variant="contained" color="secondary" fullWidth className='mt-5'>
                Find Restaurants
                </Button>
            </Container >
        )
    }
}
