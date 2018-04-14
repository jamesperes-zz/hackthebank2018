import React from "react";
import { Grid, Divider, Image, Container, Segment } from "semantic-ui-react";
import ReactDOM from "react-dom";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";


Charts(FusionCharts);

const myDataSource = {
  chart: {
    caption: "Harry's SuperMart",
    subCaption: "Top 5 stores in last month by revenue",
    numberPrefix: "$"
  },
  data: [
    {
      label: "Bakersfield Central",
      value: "880000"
    },
    {
      label: "Garden Groove harbour",
      value: "730000"
    },
    {
      label: "Los Angeles Topanga",
      value: "590000"
    },
    {
      label: "Compton-Rancho Dom",
      value: "520000"
    },
    {
      label: "Daly City Serramonte",
      value: "330000"
    }
  ]
};

const chartConfigs = {
  type: "column2d",
  width: 600,
  height: 400,
  dataFormat: "json",
  dataSource: myDataSource
};

const HomeView = () => {
  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column>Profile Data</Grid.Column>
        </Grid.Row>

        <Grid.Row>
          grafico
          <ReactFC {...chartConfigs} />
          <div id="container" />
        </Grid.Row>

        <Grid.Row>grupo</Grid.Row>
      </Grid>
    </div>
  );
};

export default HomeView;
