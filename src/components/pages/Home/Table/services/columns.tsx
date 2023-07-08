import { Box, Button, IconButton, Typography } from "@mui/material";
import { CellContext, createColumnHelper } from "@tanstack/react-table";
import { DateTime } from "luxon";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import Link from "next/link";
import useClient from "hooks/useClient";

const columnHelper = createColumnHelper<ISetData>();

const columns = [
  columnHelper.accessor("name", {
    cell: (info) => (
      <Box
        display="flex"
        alignItems="center"
        height="4rem"
        borderBottom="1px solid gray"
      >
        <Box
          sx={{
            display: "flex",
            gap: "0.75rem",
            alignItems: "flex-center",
          }}
        >
          <Box
            sx={{
              marginTop: "0.6rem",
              width: "1rem",
              height: "0.5rem",
              backgroundColor: info.row.original.color,
            }}
          ></Box>
          <Box
            sx={{ display: "flex", gapY: "0.25rem", flexDirection: "column" }}
          >
            <Typography
              variant="subtitle1"
              sx={{ color: "text.primary", fontWeight: "500" }}
            >
              {info.getValue()}
            </Typography>
            <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
              {info.row.original.brandName ??
                info.row.original.clientName ??
                ""}
            </Typography>
          </Box>
        </Box>
      </Box>
    ),
    header: () => (
      <Typography
        variant="subtitle1"
        sx={{
          color: "text.secondary",
          fontWeight: "500",
          textAlign: "left",
          padding: "0 0 1rem 0",
          borderBottom: "1px solid ",
        }}
      >
        Set Name
      </Typography>
    ),
    size: 15
  }),
  columnHelper.accessor("category", {
    cell: (info) => (
      <Box
        sx={{
          display: "flex",
          gapX: "0.25rem",
          alignItems: "center",
          borderBottom: "1px solid gray",
          height: "4rem",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{ color: "text.secondary", fontWeight: "400" }}
        >
          {info.getValue()}
        </Typography>
      </Box>
    ),
    header: () => (
      <Typography
        variant="subtitle1"
        sx={{
          color: "text.secondary",
          fontWeight: "500",
          textAlign: "left",
          padding: "0 0 1rem 0",
          borderBottom: "1px solid ",
        }}
      >
        Category
      </Typography>
    ),
    size: 25
  }),
  columnHelper.accessor("address", {
    cell: (info) => (
      <Box
        sx={{
          display: "flex",
          gapX: "0.25rem",
          alignItems: "center",
          borderBottom: "1px solid gray",
          height: "4rem",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{ color: "text.primary", fontWeight: "400" }}
        >
          {info.getValue()}
        </Typography>
      </Box>
    ),
    header: () => (
      <Typography
        variant="subtitle1"
        sx={{
          color: "text.secondary",
          fontWeight: "500",
          textAlign: "left",
          padding: "0 0 1rem 0",
          borderBottom: "1px solid ",
        }}
      >
        Address
      </Typography>
    ),
    size: 30
  }),
  columnHelper.accessor("nextAvailable", {
    cell: (info) => <NextAvailableComponent info={info} />,
    header: () => (
      <Typography
        variant="subtitle1"
        sx={{
          color: "text.secondary",
          fontWeight: "500",
          textAlign: "left",
          padding: "0 0 1rem 0",
          borderBottom: "1px solid gray",
        }}
      >
        Next Availability
      </Typography>
    ),
    size: 25
  }),
  columnHelper.accessor("id", {
    cell: (info) => (
      <Box
        sx={{
          display: "flex",
          gapX: "0.25rem",
          alignItems: "center",
          borderBottom: "1px solid gray",
          height: "4rem",
        }}
      >
        <IconButton
          LinkComponent={Link}
          component="a"
          href={`/${info.getValue()}`}
        >
          <ArrowCircleRightOutlinedIcon />
        </IconButton>
      </Box>
    ),
    header: () => (
      <Typography
        variant="subtitle1"
        sx={{
          color: "text.secondary",
          fontWeight: "500",
          textAlign: "left",
          padding: "0 0 1rem 0",
          borderBottom: "1px solid gray",
        }}
      >
        Action
      </Typography>
    ),
    size: 5
  }),
];

const NextAvailableComponent = ({
  info,
}: {
  info: CellContext<ISetData, string>;
}) => {
  //IsClient Custom HOOK
  const client = useClient();

  return (
    <Box
      sx={{
        display: "flex",
        gapX: "0.25rem",
        alignItems: "center",
        borderBottom: "1px solid gray",
        height: "4rem",
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{ color: "text.primary", fontWeight: "400" }}
      >
        {client &&
          DateTime.fromISO(info.getValue()).toFormat("ccc,dd/LL - HH:mm")}
      </Typography>
    </Box>
  );
};

export default columns;
