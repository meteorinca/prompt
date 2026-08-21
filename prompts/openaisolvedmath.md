[Provide a precise definition of the domain, objects, rules, and the problem statement.
Include all necessary terminology, constraints, and edge cases. For example, if it's a
conjecture, state it exactly; if it's a design task, specify requirements and success
criteria.]

Resolve the following problem completely:
[State the core problem or conjecture in a single clear sentence or set of requirements.]

Assume for purposes of this task that a complete solution exists (i.e., the problem is
solvable and you are to produce a valid solution, not argue about its openness or difficulty).
A complete solution must achieve exactly the following:
[Specify precisely what counts as a solution—e.g., a proof of a theorem, a construction, an
algorithm, a design meeting all specs, etc. List the essential properties that must hold.]
Partial progress does not count unless it directly implies a complete solution to the
original problem. In particular, the following are insufficient:
- [List categories of incomplete work that are not acceptable, tailored to your problem.
  Example: special cases, weaker versions, reductions to other unproven conjectures,
  heuristic solutions without guarantees, approximate solutions, partial implementations,
  etc.]

Use multiagent v2 aggressively and dynamically. You have up to 64 concurrent agents
available. Do not use a fixed assignment such as “N agents for strategy X.” Instead, manage
the search using the following heuristics:
- Begin with a genuinely diverse portfolio of approaches. Agents should explore substantially
different formulations, representations, invariants, decompositions, transformations,
algebraic/analytic viewpoints, structural inductions, flow formulations, state‑space
explorations, embeddings, extremal arguments, computational sanity checks, and any other
relevant paradigms.
- Do not tell most agents the currently favored approach. Preserve independence during early
rounds so that agents do not all converge to the same attractive but incomplete reduction.

- Maintain an explicit registry of approach families. Group agents by the mathematical or
conceptual idea they are using, not by superficial wording. If many agents converge to one
family, redirect some of them toward underexplored formulations.
- Do not allow one approach to dominate merely because it gives elegant reductions. A route
that ends at a lemma or subgoal equivalent in strength to the original problem is not close
to completion unless it supplies a genuinely new proof of that subgoal.
- When an approach stalls at a missing subgoal of equivalent difficulty, mark that route as
blocked. Only continue assigning agents to it if someone proposes a materially new
mechanism, invariant, or construction.
- Keep several incompatible solution routes alive through multiple rounds. Cross-pollinate
ideas only after independent agents have developed them far enough to expose their real
strengths and gaps.
- Use adversarial agents throughout: every candidate solution must be checked for
[list the specific failure modes, edge cases, or subtle errors that are typical for this
problem domain. Examples: off-by-one errors, incorrect handling of trivial instances,
hidden assumptions, circular reasoning, misapplication of a theorem, violation of a
constraint, etc.].
- Require agents to return concrete lemmas, constructions, equations, code, or
counterexamples to proposed subclaims. Reject status reports, vague optimism, and claims
that an unproven global compatibility statement is “routine.”
- The root agent should repeatedly synthesize, challenge, redirect, and launch new rounds.
Do not stop after the first wave fails. Produce a complete solution if one survives audit;
otherwise report only the strongest rigorously derived partial result and its exact
remaining gap.
Do not return merely because current approaches fail or agents report obstacles of apparent
difficulty equal to the original problem. Continue launching new rounds, reopening blocked
approaches only when there is a genuinely new mechanism, and searching for fresh
formulations.
Return only when a complete solution has been found and survives adversarial audit. Do not
return a reduction, partial result, isolated missing subgoal, “best effort” summary, or
explanation of why the problem is difficult.
Public search may be used only for ordinary background knowledge or standard named theorems
relevant to the problem domain, not to search for a solution to this exact problem or
benchmark. Do not search the public web merely to determine whether the problem is open, and
do not answer that it is open.
