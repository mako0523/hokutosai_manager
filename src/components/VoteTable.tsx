"use client";

import React from "react";
import styled from "styled-components";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledVoteTable = styled.div`
  width: 80%;
  max-width: 800px;
  margin: 0 auto;
`;

type VoteTableProps = {
  voteName: string;
};

export const VoteTable = async (props: VoteTableProps) => {
  const { voteName } = props;
  const votes = await fetchVotes(voteName);

  return (
    <StyledVoteTable>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>インデックス</TableCell>
              <TableCell align="right">名前</TableCell>
              <TableCell align="right">投票数</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {votes.map((vote, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="right">{vote.name}</TableCell>
                <TableCell align="right">{vote.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledVoteTable>
  );
};

type VoteProps = {
  name: string;
  count: number;
};

const fetchVotes = async (voteName: string): Promise<VoteProps[]> => {
  const res = await fetch(`https://hokutofes.com/api/vote/${voteName}`);
  return res.json();
};
