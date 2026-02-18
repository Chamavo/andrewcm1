import { describe, it, expect } from 'vitest';
import problems from '../data/maths/problems150.json';
import { niveaux } from '../data/maths/structuredExercises';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Index from '../pages/Index';
import { UserProvider } from '../context/UserContext';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import React from 'react';

const queryClient = new QueryClient();

// Mock scrollTo since it's not implemented in jsdom
window.scrollTo = () => { };

describe('Audit: Data Integrity', () => {
    describe('problems150.json', () => {
        it('should calculate unique IDs correctly', () => {
            const ids = problems.map((p: any) => p.id);
            const uniqueIds = new Set(ids);
            if (ids.length !== uniqueIds.size) {
                console.error('Duplicate IDs found:', ids.filter((item, index) => ids.indexOf(item) !== index));
            }
            expect(uniqueIds.size).toBe(ids.length);
        });

        it('should have valid structure for all problems', () => {
            problems.forEach((p: any) => {
                try {
                    expect(p.id).toBeDefined();
                    expect(p.title).toBeDefined();
                    expect(typeof p.title).toBe('string');
                    expect(p.text).toBeDefined();
                    expect(p.text.length).toBeGreaterThan(0);
                    // Check for potential markdown pollution in text fields
                    if (typeof p.title === 'string') {
                        expect(p.title).not.toContain('##');
                    }
                } catch (e) {
                    console.error(`Problem ID ${p.id} failed structure check:`, e);
                    throw e;
                }
            });
        });

        it('should have valid non-ambiguous questions', () => {
            problems.forEach((p: any) => {
                if (p.questions) {
                    p.questions.forEach((q: any, i: number) => {
                        expect(q.response).toBeDefined();
                        if (q.response.length === 0) {
                            console.error(`Empty response found in Problem ID: ${p.id}, Question Index: ${i}`);
                        }
                        expect(q.response.length).toBeGreaterThan(0);
                        // Check logic: if unit is present, response should probably be numeric-ish or specific text
                    });
                }
            });
        });
    });

    describe('structuredExercises.ts', () => {
        it('should have valid exercises for all levels', () => {
            niveaux.forEach((n) => {
                expect(n.niveau).toBeGreaterThan(0);
                expect(n.exercices.length).toBeGreaterThan(0);
                n.exercices.forEach((e) => {
                    expect(e.enonce).toBeTruthy();
                    expect(e.reponse).toBeDefined();
                });
            });
        });
    });
});

describe('Audit: Navigation Integrity', () => {
    // Note: We are testing critical paths rendering, not full e2e interaction which is harder in standard unit test env
    // But we check if key components load.

    it('should render Home page with correct buttons', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <TooltipProvider>
                    <MemoryRouter initialEntries={['/']}>
                        <UserProvider>
                            <Index />
                        </UserProvider>
                    </MemoryRouter>
                </TooltipProvider>
            </QueryClientProvider>
        );
        // We expect "Orthographe", "Mathématiques"
        expect(screen.getByText(/Orthographe/i)).toBeInTheDocument();
        expect(screen.getByText(/Mathématiques/i)).toBeInTheDocument();
        // Also expect Déconnexion button
        expect(screen.getByText(/Déconnexion/i)).toBeInTheDocument();
    });
});
